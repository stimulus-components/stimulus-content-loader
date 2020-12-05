# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Prevent error if the url is empty.

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="content-loader" data-content-loader-url="/message.html"></div>
+ <div data-controller="content-loader" data-content-loader-url-value="/message.html"></div>
```

## [1.0.0] - 2020-10-15

### Added

- Adding controller
