require 'metainspector'
require 'json'

file = File.open('visualizations_taxonomy_no_tools.json')
content = file.read
json = JSON.parse(content)

json.each do |j|
  if j['wiki_url'] != "" && (j['description'] == "" || j['image_url'] == "")
    page = MetaInspector.new(j['wiki_url'])
    if j['description'] == ""
      j['description'] = page.description
    end
    if j['image_url'] == ""
      j['image_url'] = page.images.best
    end
  end  
end

result_file = File.open('tax_results.json', 'w')
result_file << json.to_json
result_file.close
