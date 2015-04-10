require 'metainspector'
require 'json'

def transliterate(s)
  # Transliterate by Dave South
  # Based on permalink_fu by Rick Olsen
  
  # Escape str by transliterating to UTF-8 with Iconv
  s = s.encode("UTF-8", :invalid => :replace, :undef => :replace, :replace => "_")
 
  # Downcase string
  s.downcase!
 
  # Remove apostrophes so isn't changes to isnt
  s.gsub!(/'/, '')

  s.gsub!(/.js/,'')
 
  # Replace any non-letter or non-number character with a space
  s.gsub!(/[^A-Za-z0-9]+/, ' ')
 
  # Remove spaces from beginning and end of string
  s.strip!
 
  # Replace groups of spaces with single hyphen
  s.gsub!(/\ +/, '-')
 
  return s
end


file = File.open('libraries.json')
content = file.read
json = JSON.parse(content)

json.each do |j|
  if j['url'] != "" && j['url_github'] == nil
    puts j["name"]
    begin
      page = MetaInspector.new(j['url'], :connection_timeout => 10, :read_timeout => 5, :retries => 4)
    rescue => e
      puts j["name"] + " error"
      puts e.to_s
    else
      j['url_github'] = page.links.http.select{|i| i[/^https?:\/\/github.com\/\w*\/\w*\/$/] }
    end
  end
end

result_file = File.open('lib_results.json', 'w')
result_file << json.to_json
result_file.close

