# Project Overview

- Backend project using TypeScript only, no web elements.
- Do not import new libraries without permission.
- Use ES imports, not require().

## Project Description

This application runs after each torrent download is completed in the Transmission daemon service.
For it to work, Transmission must be configured in the Transmission configuration file `settings.json` using the parameters
`script-torrent-done-enabled` and `script-torrent-done-filename`

The project uses unit tests.
