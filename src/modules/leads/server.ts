import { LeadStatus, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import type { SignupInput } from "@/modules/auth/schemas/signup";
import type { BriefingIntakeInput } from "@/modules/briefing/schemas/briefing-intake";
import type { QuickIntakeInput } from "@/modules/intake/schemas/quick-intake";

export async function createClientAccount(input: SignupInput) {
  const email = input.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Ja existe uma conta com este e-mail.");
  }

  return prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        legalName: input.companyName,
        tradeName: input.companyName,
      },
    });

    const contact = await tx.contact.create({
      data: {
        companyId: company.id,
        name: input.fullName,
        email,
        phone: input.phone,
        isPrimary: true,
      },
    });

    const user = await tx.user.create({
      data: {
        name: input.fullName,
        email,
        passwordHash: hashPassword(input.password),
        role: UserRole.CLIENT,
        companyId: company.id,
        contactId: contact.id,
      },
    });

    return { user };
  });
}

export async function createQuickLead(input: QuickIntakeInput) {
  const email = input.email.toLowerCase();

  return prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        legalName: input.companyName,
        tradeName: input.companyName,
      },
    });

    const contact = await tx.contact.create({
      data: {
        companyId: company.id,
        name: input.contactName,
        email,
        phone: input.phone,
        isPrimary: true,
      },
    });

    const lead = await tx.lead.create({
      data: {
        companyId: company.id,
        primaryContactId: contact.id,
        source: "quick-intake",
        summary: `Cadastro basico enviado por ${input.contactName}`,
        mvpGoal: "Lead captado para contato comercial inicial.",
        consentGiven: true,
      },
    });

    return { lead };
  });
}

export async function createDetailedBriefing(
  input: BriefingIntakeInput,
  file: File | null,
  userId: string,
) {
  const email = input.email.toLowerCase();

  return prisma.$transaction(async (tx) => {
    const currentUser = await tx.user.findUnique({
      where: { id: userId },
      select: { companyId: true, contactId: true },
    });

    let companyId = currentUser?.companyId ?? null;
    let contactId = currentUser?.contactId ?? null;

    if (!companyId) {
      const company = await tx.company.create({
        data: {
          legalName: input.companyName,
          tradeName: input.companyName,
          website: input.website || null,
          segment: input.segment,
        },
      });
      companyId = company.id;
    } else {
      await tx.company.update({
        where: { id: companyId },
        data: {
          legalName: input.companyName,
          tradeName: input.companyName,
          website: input.website || null,
          segment: input.segment,
        },
      });
    }

    if (!contactId) {
      const contact = await tx.contact.create({
        data: {
          companyId,
          name: input.contactName,
          email,
          phone: input.phone,
          jobTitle: input.role,
          isPrimary: true,
        },
      });
      contactId = contact.id;
    } else {
      await tx.contact.update({
        where: { id: contactId },
        data: {
          companyId,
          name: input.contactName,
          email,
          phone: input.phone,
          jobTitle: input.role,
        },
      });
    }

    await tx.user.update({
      where: { id: userId },
      data: {
        companyId,
        contactId,
      },
    });

    const lead = await tx.lead.create({
      data: {
        companyId,
        primaryContactId: contactId,
        source: "briefing",
        summary: input.challenge,
        mvpGoal: input.goal,
        budgetRange: input.budget,
        deadlineExpectation: input.timeline,
        needsNda: input.needsNda,
        consentGiven: input.consent,
      },
    });

    if (file && file.size > 0) {
      await tx.briefing.create({
        data: {
          leadId: lead.id,
          uploadedByContactId: contactId,
          originalFilename: file.name,
          storageKey: `local:${lead.id}:${file.name}`,
          mimeType: file.type || "application/octet-stream",
          sizeBytes: file.size,
        },
      });
    }

    return { lead };
  });
}

export async function getClientWorkspace(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      company: true,
      contact: true,
    },
  });

  if (!user?.companyId) {
    return { user, latestLead: null, leadsCount: 0 };
  }

  const [latestLead, leadsCount] = await Promise.all([
    prisma.lead.findFirst({
      where: { companyId: user.companyId },
      include: { briefings: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.lead.count({
      where: { companyId: user.companyId },
    }),
  ]);

  return { user, latestLead, leadsCount };
}

export async function getDashboardData() {
  const [total, inReview, readyForProposal, critical, leads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: LeadStatus.IN_REVIEW } }),
    prisma.lead.count({ where: { status: LeadStatus.READY_FOR_PROPOSAL } }),
    prisma.lead.count({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        status: {
          in: [LeadStatus.RECEIVED, LeadStatus.IN_REVIEW],
        },
      },
    }),
    prisma.lead.findMany({
      include: {
        company: true,
        primaryContact: true,
        assignedTo: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 20,
    }),
  ]);

  return {
    summary: [
      { label: "Recebidos", value: String(total) },
      { label: "Em analise", value: String(inReview) },
      { label: "Prontos para proposta", value: String(readyForProposal) },
      { label: "SLA critico", value: String(critical) },
    ],
    leads,
  };
}
