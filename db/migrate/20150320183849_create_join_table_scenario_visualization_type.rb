class CreateJoinTableScenarioVisualizationType < ActiveRecord::Migration
  def change
    create_join_table :scenarios, :visualization_types
  end
end
