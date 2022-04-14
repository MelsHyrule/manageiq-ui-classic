import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MiqFormRenderer, { componentTypes, validatorTypes, useFormApi } from '@@ddf';
import createSchema from './attach-detach-cloud-volume.schema';
import miqRedirectBack from '../../helpers/miq-redirect-back';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button } from 'carbon-components-react';

const AttachDetachCloudVolumeForm = ({ recordId, isAttach, vmChoices }) => {

  const [{ isLoading, fields }, setState] = useState({ isLoading: true, fields: [] });

  const loadSchema = (appendState = {}) => ({ data: { form_schema: { fields } } }) => {
    var finalFields = fields ? fields :
    [{
      component: componentTypes.TEXT_FIELD,
      id: 'device_mountpoint',
      name: 'device_mountpoint',
      label: __('Device Mountpoint'),
      isRequired: false,
      validate: [{ type: validatorTypes.REQUIRED }],
    }]; 
    setState((state) => ({
      ...state,
      ...appendState,
      fields: finalFields,
      isLoading: false,
    }));
  };

  useEffect(() => {
    if(isLoading) {
      API.options(`/api/cloud_volumes/${recordId}?option_action=attach`).then(loadSchema());
    }
  });

  const vmOptions = [];
  vmChoices.forEach((vm) => {
    vmOptions.push({ label: vm[0], value: vm[1].toString() });
  });

  const onSubmit = (values) => {
    console.log(values)
    miqSparkleOn();
    const resource = {
      vm_id: values.vm_id,
      device: values.device_mountpoint ? values.device_mountpoint : "",
    };
    const payload = {
      action: isAttach ? 'attach' : 'detach',
      resource,
    };
    const request = API.post(`/api/cloud_volumes/${recordId}`, payload);

    request.then(() => {
      const message = sprintf(isAttach
        ? __('Attachment of Cloud Volume has been successfully queued.')
        : __('Detachment of Cloud Volume of Host has been successfully queued.'));

      miqRedirectBack(message, 'success', '/cloud_volume/show_list');
    }).catch(miqSparkleOff);
  };

  const onCancel = () => {
    miqSparkleOn();
    const message = sprintf(isAttach
      ? __('Attaching Cloud Volume was cancelled by the user.')
      : __('Detaching Cloud Volume was cancelled by the user.'));

    miqRedirectBack(message, 'warning', '/cloud_volume/show_list');
  };

  return !isLoading && (
    <MiqFormRenderer
      schema={createSchema(vmOptions, fields)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      FormTemplate={(props) => <FormTemplate {...props} isAttach={isAttach} fields={fields} />}
      canReset
    />
  );
};

const verifyIsDisabled = (values, fields) => {
  var isDisabled = true;
  if (values.vm_id && fields[0].isRequired && values.device_mountpoint) {
    isDisabled = false
  } else if (values.vm_id && !fields[0].isRequired) {
    isDisabled = false
  }
  return isDisabled;
};

const FormTemplate = ({
  isAttach, fields, formFields,
}) => {
  const {
    handleSubmit, onReset, onCancel, getState,
  } = useFormApi();
  const { valid, pristine } = getState();
  const submitLabel = isAttach ? __('Attach') : __('Detach');
  return (
    <form onSubmit={handleSubmit}>
      {formFields}
      <FormSpy>
        {({ values }) => (
          <div className="custom-button-wrapper">
            <Button
              disabled={verifyIsDisabled(values, fields)}
              kind="primary"
              className="btnRight"
              type="submit"
              variant="contained"
            >
              {submitLabel}
            </Button>

            <Button
              disabled={!valid && pristine}
              kind="secondary"
              className="btnRight"
              variant="contained"
              onClick={onReset}
              type="button"
            >
              { __('Reset')}
            </Button>

            <Button variant="contained" type="button" onClick={onCancel} kind="secondary">
              { __('Cancel')}
            </Button>
          </div>
        )}
      </FormSpy>
    </form>
  );
};

AttachDetachCloudVolumeForm.propTypes = {
  recordId: PropTypes.string,
  isAttach: PropTypes.bool,
};
AttachDetachCloudVolumeForm.defaultProps = {
  recordId: undefined,
  isAttach: true,
};

export default AttachDetachCloudVolumeForm;
