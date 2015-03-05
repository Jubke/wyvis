class RemoveNonRequiredColsFromImplementation < ActiveRecord::Migration
  def change
    remove_column :scenarios, :javascript_file_name
    remove_column :scenarios, :javascript_file_size
    remove_column :scenarios, :javascript_content_type
    remove_column :scenarios, :javascript_updated_at
    remove_column :scenarios, :javascript_content

    remove_column :implementations, :javascript_file_name
    remove_column :implementations, :javascript_file_size
    remove_column :implementations, :javascript_content_type
    remove_column :implementations, :javascript_updated_at
    remove_column :implementations, :javascript_content
    remove_column :implementations, :stylesheet_file_name
    remove_column :implementations, :stylesheet_file_size
    remove_column :implementations, :stylesheet_content_type
    remove_column :implementations, :stylesheet_updated_at
    remove_column :implementations, :stylesheet_content
  end
end
