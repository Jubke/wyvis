require 'json'

file = File.open('libraries.json')
content = file.read
json = JSON.parse(content)

json.each do |j|

end

result_file = File.open('lib_results.json', 'w')
result_file << json.to_json
result_file.close