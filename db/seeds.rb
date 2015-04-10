# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# adding libraries
file = File.open('db/libraries.json')
content = file.read
libraries = JSON.parse(content)

libraries.each do |lib|
  new_library = Library.create!( 
    :name            => lib['name'],
    :url             => lib['url'],
    :url_code        => lib['url_code'],
    :url_docs        => lib['url_docs'],
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

  # adding libraries resources
  lib['lib']['assets'].each do |asset|
    new_library.resources.create!(url: asset['url'], content_type: asset['content_type'])
  end

end

# adding data types
file = File.open('db/data_types.json')
content = file.read
data_types = JSON.parse(content)

data_types.each do |dt|
  DataType.create!(name: dt['name'])
end 

# adding data tasks
file = File.open('db/visualization_tasks.json')
content = file.read
vis_tasks = JSON.parse(content)

vis_tasks.each do |vt|
  VisualizationTask.create!(
    name: vt['name'],
    description: vt['description']
  )
end 

# adding visualization types
file = File.open('db/visualization_types.json')
content = file.read
vis_types = JSON.parse(content)

vis_types.each do |vt|
  new_vis_type = VisualizationType.create!(
    name: vt["name"],
    wiki_url: vt["wiki_url"],
    image_url: vt["image_url"],
    description: vt["description"]
  )
  # adding connection to data types
  new_vis_type.data_types << DataType.where(name: vt['category'])
end

# adding scenarios
file = File.open('db/scenarios.json')
content = file.read
scenarios = JSON.parse(content)

scenarios.each do |vt|
  new_scenario = Scenario.create!(
    name: vt["name"],
    short: vt["short"],
    description: vt["description"]
  )
  # adding connection to data types
  vt['data_types'].each do |dt|
    new_scenario.data_types << DataType.where(name: dt)
  end
  # adding connection to data tasks
  vt['visualization_tasks'].each do |vt|
    new_scenario.visualization_tasks << VisualizationTask.where(name: vt)
  end
  # adding connection to data types
  vt['visualization_types'].each do |vt|
    new_scenario.visualization_types << VisualizationType.where(name: vt)
  end
  # adding implementations
  vt['implementations'].each do |dt|
    lib = Library.where(name: dt).first
    new_scenario.implementations.create!(library_id: lib['id'])
  end
end