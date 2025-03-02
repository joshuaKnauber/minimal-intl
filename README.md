# Minimal Intl

Minmal Intl is meant to be the simplest possible, typesafe solution to add support for multiple languages to your typescript application. It is not meant to be a feature complete localization library and won't replace current major libraries.

## Installation

```bash
npm install minimal-intl
```

## Usage

In a file, e.g. in your lib/intl/index.ts, initialize your intl utility. Provide keys for all your translation files as well as the default locale.

```ts
import { initIntl } from "minimal-intl";
import de from "./de.json";
import en from "./en.json";

export const intl = initIntl({ en, de }, "en");
```

A locale file should be a normal json file and can contain nested keys.

```json
{
    "option": "an option",
    "nested": {
        "key": "nested key with {{placeholder}}",
    }
}
```

You can then use the `intl` object anywhere in your application.

```tsx
// ...
<span>
    Some Test {intl.get("nested.key", { placeholder: 123 })} Text
</span>
// ...
```