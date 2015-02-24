# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Bootstrap configs
# Precompile Bootstrap fonts
Rails.application.config.assets.precompile << %r(bootstrap-sass-twbs/assets/fonts/bootstrap/[\w-]+\.(?:eot|svg|ttf|woff2?)$)

Rails.application.config.assets.precompile += %w( frame.js )
