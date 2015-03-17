class AddCdnUrlToLibrary < ActiveRecord::Migration
  def change
    add_column :libraries, :cdn_url, :string
  end
end
