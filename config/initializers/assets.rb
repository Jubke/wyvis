# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Load ENV variables from '~/config/local_env.yml'
Rails.application.config.before_configuration do
  env_file = File.join(Rails.root, 'config', 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)
end

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Bootstrap configs
# Precompile Bootstrap fonts
Rails.application.config.assets.precompile << %r(bootstrap-sass-twbs/assets/fonts/bootstrap/[\w-]+\.(?:eot|svg|ttf|woff2?)$)

Rails.application.config.assets.precompile += %w( frame.js )

Rails.application.config.assets.precompile << Rails.root.join('vendor', 'assets', 'components')