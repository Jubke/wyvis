module Transliterate extend ActiveSupport::Concern

  def transliterate(s)
    # Transliterate by Dave South
    # Based on permalink_fu by Rick Olsen
    
    # Escape str by transliterating to UTF-8 with Iconv
    s = s.encode("UTF-8", :invalid => :replace, :undef => :replace, :replace => "_")
   
    # Downcase string
    s.downcase!
   
    # Remove apostrophes so isn't changes to isnt
    s.gsub!(/'/, '')
   
    # Replace any non-letter or non-number character with a space
    s.gsub!(/[^A-Za-z0-9]+/, ' ')
   
    # Remove spaces from beginning and end of string
    s.strip!
   
    # Replace groups of spaces with single hyphen
    s.gsub!(/\ +/, '-')
   
    return s
  end

  
  def transliterate_name
    transliterate(self.name);
  end

end