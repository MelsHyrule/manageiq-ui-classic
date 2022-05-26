import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MiqFormRenderer from '@@ddf';
import createSchema from './schedule-form.schema';
// import miqRedirectBack from '../../helpers/miq-redirect-back';

const ScheduleForm = ({ scheduleFormId }) => {

  // API.get('/ops/schedule_form_fields/' + scheduleFormId) // TODO figure this out
  // .then((getScheduleFormDataComplete) => {
  //   console.log("hello this passed and gave information")
  //   console.log(getScheduleFormDataComplete)
  // })
  // .catch((err) => { //miqService.handleFailure
  //   console.log("it exploded")
  //   console.log(err)
  // })

  const onSubmit = (values) => {
    // miqSparkleOn();
    // const request = recordId ? API.patch(`/api/host_aggregates/${recordId}`, values) : API.post('/api/host_aggregates', values);

    // request.then(() => {
    //   const message = sprintf(recordId
    //     ? __('Modification of Host Aggregate %s has been successfully queued')
    //     : __('Add of Host Aggregate "%s" has been successfully queued.'),
    //   values.name);

    //   miqRedirectBack(message, 'success', '/host_aggregate/show_list');
    // }).catch(miqSparkleOff);
  };

  const onCancel = () => {
    // const message = sprintf(
    //   recordId
    //     ? __('Edit of Host Aggregate "%s" was canceled by the user.')
    //     : __('Creation of new Host Aggregate was canceled by the user.'),
    //   initialValues && initialValues.name,
    // );

    // miqRedirectBack(message, 'warning', '/host_aggregate/show_list');
  };

  return ( // !isLoading &&
    <MiqFormRenderer
      schema={createSchema()}
      // initialValues={initialValues}
      canReset={true}
      onSubmit={onSubmit}
      onCancel={onCancel}
      buttonsLabels={{ submitLabel: __('Add') }} //submitLabel: recordId ? __('Save') : __('Add')
    />
  );
};

export default ScheduleForm;
