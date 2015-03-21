class VisualizationType < ActiveRecord::Base
  include Transliterate

  validates :name, presence: true
  
  has_and_belongs_to_many :data_types
  has_and_belongs_to_many :libraries
  has_and_belongs_to_many :scenarios
end
