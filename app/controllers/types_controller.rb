class TypesController < ApplicationController
  expose(:data_types)
  expose(:data_types_rep) {DataTypeDecorator.decorate_collection(data_types)}
  expose(:vis_types, model: :visualization_types)
  expose(:vis_types_rep) {VisualizationTypeDecorator.decorate_collection(vis_types)}

  def index
    render layout: 'wide_content'
  end
end
