import React, { useState } from 'react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={toggleMenu}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      {isOpen && (
        <div className="side-menu">
          <h3>About</h3>
          <p>This is a leaf disease detection app...</p>
          <h3>Contact Us</h3>
          <p>Email: support@leafdetect.com</p>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
