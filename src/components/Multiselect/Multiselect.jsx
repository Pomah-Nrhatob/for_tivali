import React, { Component } from "react";
import "./Multiselect.css";

class Multiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      selectedOptions: props.selectedOptions || [],
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleOptionClick = (option) => {
    const { selectedOptions } = this.state;
    const isAlreadySelected = selectedOptions.some(
      (el) => el.value === option.value
    );

    if (isAlreadySelected) {
      this.setState({
        selectedOptions: selectedOptions.filter(
          (el) => el.value !== option.value
        ),
      });
    } else {
      this.setState({
        selectedOptions: [...selectedOptions, option],
      });
    }
  };

  removeOption = (optionToRemove) => {
    this.setState((prevState) => ({
      selectedOptions: prevState.selectedOptions.filter(
        (option) => option.value !== optionToRemove.value
      ),
    }));
  };

  removeAllOptions = () => {
    this.setState({ selectedOptions: [] });
  };

  triggerSelectionChange = () => {
    const { onSelectionChange } = this.props;
    const { selectedOptions } = this.state;

    if (typeof onSelectionChange === "function") {
      onSelectionChange(selectedOptions);
    }
  };

  highlightSearchMatch = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  render() {
    const { options, placeholder } = this.props;
    const { searchQuery, selectedOptions } = this.state;

    const filteredOptions = options.filter((option) =>
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="multiselect-container">
        {selectedOptions.length > 0 && <h3>Выбранные страны</h3>}
        <div className="selected-options">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <div key={index} className="selected-option">
                {option.value}
                <button
                  className="remove-option-btn"
                  onClick={() => this.removeOption(option)}
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Введи название города"
          value={searchQuery}
          onChange={this.handleSearchChange}
        />

        <div className="options-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = selectedOptions.some(
                (el) => el.value === option.value
              );

              return (
                <div
                  key={index}
                  className={`option-item ${isSelected ? "selected" : ""}`}
                  onClick={() => this.handleOptionClick(option)}
                >
                  {this.highlightSearchMatch(option.value, searchQuery)}
                  <span className="span-country">{" | " + option.label}</span>
                </div>
              );
            })
          ) : (
            <div className="no-results">Нет результатов</div>
          )}
        </div>

        <div className="controls">
          <button className="clear-all-btn" onClick={this.removeAllOptions}>
            Очистить все
          </button>
          <button className="submit-btn" onClick={this.triggerSelectionChange}>
            Применить выбор
          </button>
        </div>
      </div>
    );
  }
}

export default Multiselect;
