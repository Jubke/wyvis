class AddFileContentsToImplementation < ActiveRecord::Migration
  def change
    add_column :implementations, :javascript_content, :string
    add_column :implementations, :stylesheet_content, :string
  end
end
