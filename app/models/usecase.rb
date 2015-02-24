class Usecase < ActiveRecord::Base
  has_attached_file :javascript,
    :path => :default_path,
    :url => :default_url

  validates :name, :description, :short, presence: true
  validates_attachment :javascript, 
    :content_type => {:content_type => ['application/javascript', 'application/x-javascript', 'text/javascript']},
    :file_name => {:matches => /js\Z/}

  has_many :implementations, dependent: :destroy
  has_many :libraries, through: :implementations

  before_save :extract_javascript_content

  def javascript_path
    ActionController::Base.helpers.asset_path( javascript.url )
  end

  private
    def default_url
      '/assets/usecases/' + self.id.to_s + '/:attachment/:basename:dotextension'
    end

    def default_path
      ':rails_root/public' + default_url
    end

    def extract_javascript_content
      path = javascript.queued_for_write[:original].path
      self.javascript_content = File.open(path).read
    end
end
