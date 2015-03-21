class VisualizationTask < ActiveRecord::Base
  include Transliterate
  validates :name, presence: true
  has_and_belongs_to_many :libraries
  has_and_belongs_to_many :scenarios
end
