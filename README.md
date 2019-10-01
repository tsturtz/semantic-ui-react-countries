# semantic-ui-react-countries
[![Build Status](https://travis-ci.com/tsturtz/semantic-ui-react-countries.svg?branch=master)](https://travis-ci.com/tsturtz/semantic-ui-react-countries)
[![npm version](https://badge.fury.io/js/semantic-ui-react-countries.svg)](https://badge.fury.io/js/semantic-ui-react-countries)

A simple tool for fetching and parsing ISO-3166-1 country data for use in Semantic UI React dropdown components. Data source: [datahub.io](https://datahub.io).

## Install
```console
$ npm install -g semantic-ui-react-countries
```

## Usage
### Default
```console
$ get-countries
```
Creates/overwrites file in current directory
> **./countriesData.js**

> export const COUNTRY_OPTIONS = [{"text":"Afghanistan","key":"AF","value":"AF","flag":"AF"},{"text":"Åland Islands","key":"AX","value":"AX","flag":"AX"},{"text":"Albania","key":"AL","value":"AL","flag":"AL"},{"text":"Algeria","key":"DZ","value":"DZ","flag":"DZ"},{"text":"American Samoa","key":"AS","value":"AS","flag":"AS"},{"text":"Andorra","key":"AD", ...

### Flags
- Const name `(-n, --name)`
- Path and file name relative to current working directory `(-p, --path)`
- Exclude flag attribute `(--no-flags)`
```console
$ get-countries -n MY_COUNTRIES_DATA -p ./src/js/common/countries.js --no-flags
```
Creates/overwrites file in _specified directory_
> **./src/js/common/countries.js**

> export const MY_COUNTRIES_DATA = [{"text":"Afghanistan","key":"AF","value":"AF"},{"text":"Åland Islands","key":"AX","value":"AX"},{"text":"Albania","key":"AL","value":"AL"},{"text":"Algeria","key":"DZ","value":"DZ"},{"text":"American Samoa","key":"AS","value":"AS"},{"text":"Andorra","key":"AD","value":"AD"},{"text":"Angola","key":"AO", ...


## Use it!
_Simply import the const and use it in your semantic dropdown..._
```html
import { COUNTRY_OPTIONS } from './countriesData.js';

...

<Form>
  <Form.Field>
    <label htmlFor="country">Country</label>
    <Dropdown
      name="country"
      onChange={this.updateCountry}
      options={COUNTRY_OPTIONS}
      search
      selection
      selectOnBlur={false}
      value={this.state.country}
    />
  </Form.Field>
</Form>
```
