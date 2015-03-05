class AddShortToScenarios < ActiveRecord::Migration
  def change
    add_column :scenarios, :short, :text
  end
end
