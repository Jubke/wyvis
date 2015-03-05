class Implementation < ActiveRecord::Base
  include Transliterate
  
  validates :library_id, :scenario_id, presence: true

  belongs_to :scenario
  belongs_to :library

  before_save :set_name

  def dir_path
    self.scenario.dir_path + "/#{transliterate_name}"
  end

  def dir_url
    self.scenario.dir_url + "/#{transliterate_name}"
  end

  def script  
    File.open(dir_path + '/script.js').read
  end

  def styles  
    File.open(dir_path + '/styles.css').read
  end

  def script_url
    dir_url + "/script.js"
  end

  def styles_url
    dir_url + "/styles.css"
  end

  def json
    self.to_json(
      :methods => [:script, :styles]
    )
  end

  private
    def set_name
      self.name = self.library.name
    end
end
