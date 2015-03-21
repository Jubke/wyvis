class CreateJoinTableLibrariesVisualizationTypes < ActiveRecord::Migration
  def change
    create_join_table :libraries, :visualization_types
  end
end