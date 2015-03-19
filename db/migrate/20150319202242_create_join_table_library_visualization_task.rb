class CreateJoinTableLibraryVisualizationTask < ActiveRecord::Migration
  def change
    create_join_table :libraries, :visualization_tasks
  end
end
