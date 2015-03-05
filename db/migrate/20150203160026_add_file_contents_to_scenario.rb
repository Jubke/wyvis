class AddFileContentsToScenario < ActiveRecord::Migration
  def change
    add_column :scenarios, :javascript_content, :string
  end
end
