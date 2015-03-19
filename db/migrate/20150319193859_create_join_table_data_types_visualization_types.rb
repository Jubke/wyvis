class CreateJoinTableDataTypesVisualizationTypes < ActiveRecord::Migration
  def change
    create_join_table :data_types, :visualization_types
  end
end
