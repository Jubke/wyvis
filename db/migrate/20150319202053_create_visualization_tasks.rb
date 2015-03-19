class CreateVisualizationTasks < ActiveRecord::Migration
  def change
    create_table :visualization_tasks do |t|
      t.string :name, null: false
      t.text :short

      t.timestamps null: false
    end
  end
end
