export const navStyles = (menuOpen) => {
  return {
    display: [menuOpen ? "flex" : "none", "flex"],
    // gap: 5,
    // p: [2, 5, 7],
  };
};

export const navButtonStyles = {
  _hover: {
    cursor: "pointer",
    border: "2px",
    borderColor: "black",
  },

  width: "100%",
  fontSize: ["16px", "16px", "20px"],
  border: "2px transparent solid",
};

export const hamburgerStyles = {
  _hover: {
    cursor: "pointer",
    border: 0,
    borderColor: "none",
  },
  left: 0,
  border: "none",
  display: ["inherit", "none"],
};
