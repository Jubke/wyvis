class AddFileContentsToUsecase < ActiveRecord::Migration
  def change
    add_column :usecases, :javascript_content, :string
  end
end
