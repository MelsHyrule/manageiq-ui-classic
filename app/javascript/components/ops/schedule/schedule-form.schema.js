import { componentTypes, validatorTypes } from '@@ddf';

const placeholder_options = [
    {
        label: 'LocalHost',
        value: 'LocalHost',
    },
    {
        label: 'Target Machine',
        value: 'Target Machine',
    },
    {
        label: 'Specific Hosts',
        value: 'Specific Hosts',
    },
];

const createSchema = () => ({
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            id: 'name',
            name: 'name',
            label: __('Name'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            maxLength: 128,
        },
        {
            component: componentTypes.TEXT_FIELD,
            id: 'description',
            name: 'description',
            label: __('Description'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            maxLength: 128,
        },
        {
            component: componentTypes.CHECKBOX,
            id: 'active',
            name: 'active',
            label: __('Active'),
        },
        {
            component: componentTypes.SELECT, // if selected choice is Automation Taks => load in the Zone options
            id: 'action',
            name: 'action',
            label: __('Action'),
            placeholder: __('<Choose>'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            includeEmpty: false,
            options: placeholder_options,
        }
    ],
});

export default createSchema;
