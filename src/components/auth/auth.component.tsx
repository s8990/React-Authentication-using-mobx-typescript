import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../shared/context/store.context";
import { Dialog, TextField, Button } from "@mui/material";
import "./auth.style.css";

const AuthView: React.FC = () => {
  const { authStore } = useContext(StoreContext);
  const authenticated = authStore.isAuthenticated();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={!authenticated}>
      <div className="container">
        <TextField
          label="username"
          className="text-field"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="password"
          className="text-field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <Button onClick={() => authStore.login({ username, password })}>
          Login
        </Button>
      </div>
    </Dialog>
  );
};

const Auth = observer(AuthView);

export { Auth };
