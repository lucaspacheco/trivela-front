import * as Yup from 'yup';

import { validationMessages } from 'utils/consts';

export default Yup.object().shape({
  reason: Yup.object().nullable().required(validationMessages.required),
  league: Yup.object()
    .nullable()
    .when('reason', {
      is: (reason) => reason.value === 'team-not-added',
      then: Yup.object().required(validationMessages.required),
    }),
  team: Yup.object()
    .nullable()
    .when('reason', {
      is: (reason) => reason.value === 'team-not-added',
      then: Yup.object().required(validationMessages.required),
    }),
  description: Yup.string().required(validationMessages.required),
});
