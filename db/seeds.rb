# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

file = File.open('db/libraries.json')
content = file.read
library_list = JSON.parse(content)

library_list.each do |lib|
  new_library = Library.create!( 
    :name            => lib['name'],
    :url             => lib['url'],
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

  lib['lib']['assets'].each do |asset|
    new_library.resources.create!(url: asset['url'], content_type: asset['content_type'])
  end

end

file = File.open('db/data_types.json')
content = file.read
data_type_list = JSON.parse(content)

data_type_list.each do |dt|
    DataType.create!(name: dt['name'])
end 

file = File.open('db/visualization_types.json')
content = file.read
vis_type_list = JSON.parse(content)

vis_type_list.each do |vt|
    new_vis_type = VisualizationType.create!(
        name: vt["name"],
        wiki_url: vt["wiki_url"],
        image_url: vt["image_url"],
        description: vt["description"]
    )

    new_vis_type.data_types << DataType.where(name: vt['category'])
end