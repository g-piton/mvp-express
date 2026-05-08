import { logoutAction } from "@/modules/auth/actions";

import styles from "./logout-button.module.css";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className={styles.button} type="submit">
        Sair
      </button>
    </form>
  );
}
