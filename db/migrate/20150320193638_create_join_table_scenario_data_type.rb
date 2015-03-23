class CreateJoinTableScenarioDataType < ActiveRecord::Migration
  def change
    create_join_table :scenarios, :data_types
  end
end
