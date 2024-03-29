source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
ruby '2.2.0'
gem 'rails', '4.2.0'
# use Thin as webserver
gem 'thin'

# Use sqlite3 as the database for Active Record
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
# gem 'sprockets-es6'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'haml-rails'
gem 'high_voltage'
gem 'pg'
gem 'simple_form'
gem 'gon', '~> 5.2.3'
gem 'draper', '~> 1.3'
gem 'decent_exposure'
# gem 'devise', '~> 3.3.0'
# gem 'devise-bootstrap-views'

# web scraping
gem 'metainspector'
# Handle model attachment file uploads
gem 'paperclip', "~> 4.2"
# github api wrapper
gem 'octokit'

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  

  gem 'quiet_assets'
  gem 'better_errors'
  gem 'binding_of_caller'

  gem 'guard', '>= 2.2.2',  :require => false
  gem 'guard-bundler',      :require => false
  gem 'guard-rails',        :require => false
  gem 'guard-rspec',        :require => false
  gem 'guard-livereload',   :require => false
  gem 'rack-livereload'
  gem 'rb-fsevent',         :require=>false

  gem 'html2haml'
  gem 'rails_apps_pages'
  gem 'rails_apps_testing'
  gem 'rails_layout'

  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'rspec-rails'
  gem 'rubocop'
end

group :production do
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer',  platforms: :ruby
  gem 'rails_12factor'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'cucumber-rails', :require => false
end

