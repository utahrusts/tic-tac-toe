
import { useState } from 'react';

    export default function InfoSelector({options, selectText, handleSelectionChanged}) {

      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState(null);

      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

      const selectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        handleSelectionChanged(option);
      };

      return (
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              {selectedOption && selectedOption.image && (
                <img src={selectedOption.image} alt={selectedOption.label} className="dropdown-option-image" />
              )}
              <span className="dropdown-option-label">
                {selectedOption ? selectedOption.label : selectText}
              </span>
              <span className="dropdown-caret"></span>
            </div>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              {options.map((option, index) => (
                <li key={index} onClick={() => selectOption(option)}>
                 {option.image && <img src={option.image} alt={option.label} className="dropdown-option-image" />}
                  <span className="dropdown-option-label">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
      );
    }



   