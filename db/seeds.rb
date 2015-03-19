# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

file = File.open('libraries.json')
content = file.read
library_list = JSON.parse(content)

library_list.each do |lib|
  Library.create( 
    :name            => lib['name'],
    :url             => lib['url'],
    #:lib             => lib['lib'],
    :current_version => lib['current_version'],
    :image_url       => lib['image_url'],
    :short           => lib['best_title'],
    :web_standard    => lib['web_standards'],
    :render_tech     => lib['render_tech'],
    :dependencies    => lib['dependencies'],
    :license         => lib['license'],
    :support         => lib['support'],
    :first_release   => lib['first_release'],
    :latest_release  => lib['latest_release'],
    :meta_tags       => lib['meta_tags'],
    :description     => lib['description']
  )
end
