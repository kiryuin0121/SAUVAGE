// entry point of index.html.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/react/tailwind.css";

// component
import Header from "../../components/shared/Header";
import Content from "../../components/pages/index/Content";

const mounts = [
  { id: "header", component: <Header /> },
  {id:"content",component:<Content/>}
];
mounts.forEach(({ id, component }) => {
  const el = document.getElementById(id);
  if (el) {
    createRoot(el).render(<StrictMode>{component}</StrictMode>);
  }
});
