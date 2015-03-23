class DataType < ActiveRecord::Base
  include Transliterate
  
  has_and_belongs_to_many :visualization_types
  has_and_belongs_to_many :scenarios

  def visualization_types_rep
    VisualizationTypeDecorator.decorate_collection(self.visualization_types)
  end
end
