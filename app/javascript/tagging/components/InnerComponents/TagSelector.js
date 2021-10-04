import React from 'react';
import PropTypes from 'prop-types';
import TaggingPropTypes from '../TaggingPropTypes';
import { PfSelect } from '../../../pf-select/pf-select';

class TagSelector extends React.Component {
  handleChange = (selectedOption) => {
    this.props.onTagCategoryChange({
      id: selectedOption.value,
      description: this.props.tagCategories.find(category => category.id === selectedOption.value).description,
    });
  };


  labelWithIcon = (description, infoText) => (
    <div>
      <span
        style={{
          display: 'inline-block',
          width: 'calc(100% - 18px)',
        }}
      >
        {description}
      </span>
      <span
        className="pull-right pficon pficon-info tag-icon"
        title={infoText}
        aria-hidden="true"
      />
      <span className="sr-only">{infoText}</span>
    </div>
  );

  tagCategories = this.props.tagCategories.map(category => ({
    keyWord: category.description.toLowerCase(),
    value: category.id,
    label: category.singleValue
      ? this.labelWithIcon(category.description, this.props.infoText)
      : category.description,
  }));


  render() {
    const value = this.props.selectedOption.id ? { label: this.props.selectedOption.description, value: this.props.selectedOption.id } : null;
    return (
      <PfSelect
        meta={{}}
        options={this.tagCategories}
        input={{ onChange: this.handleChange, name: 'form-field-name', value }}
        filterOption={(option, filter) =>
          option.data.keyWord.includes(filter.toLowerCase())
        }
        placeholder={__('Select tag category')}
        id="tag_cat"
        // clearable={false}
        simpleValue={false}
        searchable
        isDisabled={this.props.isDisabled}
      />
    );
  }
}
TagSelector.propTypes = {
  tagCategories: PropTypes.arrayOf(TaggingPropTypes.category).isRequired,
  selectedOption: TaggingPropTypes.value,
  onTagCategoryChange: PropTypes.func.isRequired,
  infoText: PropTypes.string,
  isDisabled: PropTypes.bool,
};

TagSelector.defaultProps = {
  infoText: __('Only a single value can be assigned from these categories'),
  selectedOption: {},
  isDisabled: false,
};

export default TagSelector;
