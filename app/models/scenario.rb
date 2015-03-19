class Scenario < ActiveRecord::Base
  include Transliterate

  validates :name, :description, :short, presence: true

  has_many :implementations, inverse_of: :scenario, dependent: :destroy
  has_many :libraries, through: :implementations

  def script  
    File.open(dir_path + '/data.js').read
  end

  def dir_path
    "#{Rails.root.join('public','assets').to_s}/scenarios/#{transliterate_name}"
  end

  def dir_url
    "/assets/scenarios/#{transliterate_name}"
  end

  def script_url
    dir_url + '/data.js'
  end

  def has_interval?
    script.include? '.setInterval('
  end

  def json
    self.to_json(
      :methods => :script
    )
  end

  private
end
