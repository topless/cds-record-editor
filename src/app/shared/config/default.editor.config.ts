// ALWAYS access config through `environment`, DO NOT import from here

import { JsonEditorConfig } from 'ng2-json-editor';

// schema.properties._cds.properties.extracted_metadata;

export const defaultEditorConfig: JsonEditorConfig = {
  schemaOptions: {
    properties: {
      $schema: {
        hidden: true
      }
    }
  },
  shortcuts: {
    navigateRight: 'mod+shift+right'
  },
  customFormatValidation: {
    date: {
      formatChecker: value => {
        const formats = [/^\d{4}$/, /^\d{4}-\d{2}$/, /^\d{4}-\d{2}-\d{2}$/];
        return formats.some(format => {
          if (value.match(format)) {
            return Date.parse(value) !== NaN;
          }
          return false;
        });
      }
    },
    'date-time': {
      formatChecker: value => {
        const regex = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i;
        if (value.match(regex)) {
          return true;
        }
        return false;
      }
    }
  },
  enableAdminModeSwitch: false,
  menuMaxDepth: 1,
  tabsConfig: {
    defaultTabName: 'Main',
    tabs: [
      {
        name: 'References',
        properties: ['references']
      },
      {
        name: 'Authors',
        properties: [
          'collaboration',
          'accelerator_experiments',
          'authors',
          'corporate_author'
        ]
      }
    ]
  },
  previews: [
    {
      name: 'pdf',
      type: 'html',
      urlPath: '/urls/0/value'
    }
  ]
};
