require 'metainspector'
require 'json'

file = File.open('libraries.json')
content = file.read
json = JSON.parse(content)

json.each do |j|
  if j['url'] != "" && (j['description'] == "" || j['image_url'] == "" || j['meta_tags'].nil? || j['best_title'] == "")
    puts j["name"]
    begin
      page = MetaInspector.new(j['url'], :connection_timeout => 10, :read_timeout => 5, :retries => 4)
    rescue => e
      puts j["name"] + " error"
      puts e.to_s
    else
      if j['description'] == ""
        j['description'] = page.description
      end
      if j['image_url'] == ""
        begin
          j['image_url'] = page.images.best
        rescue => e
          puts j['name'] + " error:"
          puts e.to_s
        end
      end
      if j['meta_tags'].nil?
        j['meta_tags'] = page.meta_tags
      end
      if j['best_title'] == ""
        j['best_title'] = page.best_title
      end
    end
  end
end

result_file = File.open('lib_results.json', 'w')
result_file << json.to_json
result_file.close
