import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup } from 'patternfly-react';
import TagSelector from './TagSelector';
import TaggingPropTypes from '../TaggingPropTypes';

const CategoryModifier = ({
  tagCategories,
  onTagCategoryChange,
  selectedTagCategory,
  categoryLabel,
  isDisabled,
}) => (
  <FormGroup>
    <Col xs={12} md={4} lg={4}>
      <ControlLabel>{categoryLabel}</ControlLabel>
    </Col>
    <Col xs={12} md={8} lg={8}>
      <TagSelector
        tagCategories={tagCategories}
        onTagCategoryChange={onTagCategoryChange}
        selectedOption={selectedTagCategory}
        isDisabled={isDisabled}
      />
    </Col>
  </FormGroup>
);

CategoryModifier.propTypes = {
  tagCategories: PropTypes.arrayOf(TaggingPropTypes.category).isRequired,
  selectedTagCategory: TaggingPropTypes.category,
  onTagCategoryChange: PropTypes.func.isRequired,
  categoryLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
};

CategoryModifier.defaultProps = {
  categoryLabel: __('Category'),
  selectedTagCategory: {},
  isDisabled: false,
};

export default CategoryModifier;
