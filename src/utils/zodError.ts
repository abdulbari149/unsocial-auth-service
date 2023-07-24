import { z } from 'zod';

const zodErrorConverter = (error: z.ZodError) => {
  const issue = error.issues[0];
  const path = issue.path.slice(1).reduce((key, p) => {
    if (typeof p === 'number') {
      return `${key}[${p}]` as const;
    } else {
      return `${key}.${p}`;
    }
  }, issue.path[0]);

  return `${issue.message} at ${path}`;
};

export default zodErrorConverter;
