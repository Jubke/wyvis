class CreateJoinTableScenarioVisualizationTask < ActiveRecord::Migration
  def change
    create_join_table :scenarios, :visualization_tasks
  end
end
