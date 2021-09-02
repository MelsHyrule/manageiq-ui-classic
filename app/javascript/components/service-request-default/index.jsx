import React from 'react';
import MiqFormRenderer, { useFormApi } from '@@ddf';
import PropTypes from 'prop-types';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import createSchema from './service-request-default.schema';

// NOTE: parameters to be used as filters
let daysAgo;
let types;

const requestTypeDefault = [
  'provision_via_foreman',
  'template',
  'clone_to_vm',
  'clone_to_template',
  'orchestration_stack_retire',
  'provision_physical_server',
  'physical_server_firmware_update',
  'service_retire',
  'service_reconfigure',
  'clone_to_service',
  'vm_cloud_reconfigure',
  'vm_migrate',
  'vm_reconfigure',
  'vm_retire',
];

// NOTE: processing the user selected filter values
const onSubmitTest = (values, miqRequestInitialOptions) => {
  // Type (with_request_type)
  if (values.types && values.types !== 'all') {
    types = [values.types];
  } else { // default to all
    types = requestTypeDefault;
  }

  // Request Date (created_recently)
  if (values.selectedPeriod) { // user selected
    daysAgo = values.selectedPeriod;
  } else { // default
    daysAgo = miqRequestInitialOptions.timePeriods[0].value;
  }

  const submitThis = [
    [
      'created_recently',
      parseInt(daysAgo, 10),
    ], [
      'with_approval_state',
      values.approvalStateCheckboxes,
    ], [
      'with_request_type',
      types,
    ],
  ];

  if (values.reasonText) {
    submitThis.push([
      'with_reason_like',
      values.reasonText,
    ]);
  }

  sendDataWithRx({ type: 'setScope', namedScope: submitThis });
};

const ServiceRequestDefault = ({ miqRequestInitialOptions }) => {
  const onSubmit = (values) => {
    // NOTE: We only get what is *explicitly* clicked (so nothing for default values)
    onSubmitTest(values, miqRequestInitialOptions);
  };

  return (
    <div className="service-request-form">
      <MiqFormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={createSchema(miqRequestInitialOptions)}
        canReset
        onSubmit={onSubmit}
      />
    </div>
  );
};

const verifyCheckboxes = (values) => {
  let isEmpty = true;
  if (values.approvalStateCheckboxes.length > 0) {
    isEmpty = false;
  }
  return isEmpty;
};

const FormTemplate = ({ formFields }) => {
  const {
    handleSubmit, onReset, getState,
  } = useFormApi();
  const { valid, pristine } = getState();
  return (
    <form onSubmit={handleSubmit}>
      {formFields}
      <FormSpy>
        {({ values }) => (
          <div className="custom-button-wrapper">
            <button
              disabled={verifyCheckboxes(values)}
              className="bx--btn bx--btn--primary btnRight"
              id="submit"
              type="submit"
              variant="contained"
            >
              {__('Apply')}
            </button>
            <button
              disabled={!valid && pristine}
              className="bx--btn bx--btn--secondary btnRight"
              variant="contained"
              id="reset"
              onClick={onReset}
              type="button"
            >
              {__('Reset')}
            </button>
          </div>
        )}
      </FormSpy>
    </form>
  );
};

ServiceRequestDefault.propTypes = {
  miqRequestInitialOptions: PropTypes.objectOf(PropTypes.any).isRequired,
};

FormTemplate.propTypes = {
  formFields: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ServiceRequestDefault;
