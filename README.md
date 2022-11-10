# AWS Lambda CORS Handler

## Install

```sh
# npm
$ npm install aws-lambda-cors-handler mime-types axios

# yarn
$ yarn add aws-lambda-cors-handler mime-types axios

# pnpm
$ pnpm add aws-lambda-cors-handler mime-types axios
```

## Usage

```ts
import { corsHandler } from 'aws-lambda-cors-handler';

export function handler(event) {
  return corsHandler({ event, prefix: 'https://your.cors/endpoint' });
}
```
